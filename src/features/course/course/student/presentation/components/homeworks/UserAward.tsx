import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../../../../common/context/store';
import { AwardStatus } from '../../../../../../../common/entities/Award';
import { receiveAward } from '../../../data/services/handleReceiveAward';

declare global {
  interface Window {
    ethereum: any;
  }
}

const UserAward = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: userAward, status, error } = useAppSelector(
    (state) => state.courses.student.userAwardComponent,
  );
  const wallet = useAppSelector((state) => state.auth.user?.walletAddress);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [walletError, setWalletError] = useState<string>('');

  const checkMetaMask = () => {
    if (window.ethereum) {
      setIsMetaMaskInstalled(true);
    } else {
      setIsMetaMaskInstalled(false);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      setWalletError('MetaMask is not installed. Please install it first.');
      return;
    }

    navigate('/profile');
  };

  React.useEffect(() => {
    checkMetaMask();
  }, []);

  const handleReceiveAward = () => {
    if (!userAward) return;
    dispatch(receiveAward({ awardId: userAward?.id })); // TODO
  };

  if (!userAward) return null;

  if (status == 'loading') {
    return <div>
      <p>Receiving the award...</p>
      <p>We are minting token for you, the process could be long base on the blockchain traffic. Please wait!</p>
    </div>;
  } else if (status == 'failed' && error) {
    return <div>
      <p>Failed to receive the award</p>
      <p>{error}</p>
    </div>;
  }

  return (
    <div>
      {userAward && (
        <div className="">
          <h2 className="text-xl font-bold">Award for you</h2>
          <div className="px-3 py-1 rounded-xl">
            {userAward.status == AwardStatus.PENDING ? (
              <div>Waiting for teacher to approve award</div>
            ) : userAward.status == AwardStatus.APPROVED ? (
              wallet ? (
                <>
                  <div>Token amount: {parseFloat(userAward.tokenAmount) / 1e18} EDC</div>
                  <button
                    className="px-3 py-1 bg-blue-400 hover:bg-blue-700 rounded-2xl"
                    onClick={handleReceiveAward}
                  >
                    Receive The Award
                  </button>
                </>
              ) : (
                <>
                  {isMetaMaskInstalled ? (
                    <>
                      <div className="mt-4">You need to connect your wallet to receive the award</div>
                      <button onClick={connectWallet} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200">
                        Connect Wallet with MetaMask
                      </button>
                    </>
                  ) : (
                    <div className="mt-4">
                      <div className="text-red-500">MetaMask is not installed.</div>
                      <a
                        href="https://metamask.io/download.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        Click here to install MetaMask
                      </a>
                    </div>
                  )}
                  {walletError && <div className="mt-2 text-red-500">{walletError}</div>}
                </>
              )
            ) : userAward.status == AwardStatus.REJECTED ? (
              <div>Teacher Rejected</div>
            ) : (
              <div>
                <div>Token amount: {parseFloat(userAward.tokenAmount) / 1e18} EDC</div>
                {userAward.transactionHash && <div>Transaction Hash:
                  <a onClick={() => {
                    window.open(`https://sepolia.etherscan.io/tx/${userAward.transactionHash}`, '_blank');
                  }} className="text-blue-500 hover:underline">
                    {userAward.transactionHash}
                  </a>                </div>}
                {userAward.reviewDate && <div>Review Date: {new Date(userAward.reviewDate).toLocaleDateString()}</div>}
                {userAward.comments && <div>Comments: {userAward.comments}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserAward;
