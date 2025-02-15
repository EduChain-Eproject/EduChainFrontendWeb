import { useAppDispatch, useAppSelector } from '../../../../common/context/store';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setUserWalletAction } from '../redux/UserProfileAction';
import Web3 from 'web3';

declare global {
  interface Window {
    ethereum: any;
  }
}

const UserProfileComp: React.FC = () => {
  const { data } = useAppSelector((state) => state.userProfile.profilePage);
  const dispatch = useAppDispatch();
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState<boolean>(false);
  const [walletLinked, setWalletLinked] = useState<boolean>(!!data?.walletAddress);
  const [loading, setLoading] = useState<boolean>(false);
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

    setLoading(true);
    try {
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const walletAddress = accounts[0];

      await dispatch(setUserWalletAction({ walletAddress }));

      setWalletLinked(true);
    } catch (error) {
      setWalletError('Failed to connect wallet. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    checkMetaMask();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {data ? (
        <>
          <h2 className="text-3xl font-bold mb-8 text-center">User Profile</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
            <img
              src={data.avatarPath}
              alt="User Avatar"
              className="w-32 h-32 object-cover rounded-full mb-4 md:mb-0"
            />
            <div className="w-full">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Email:</h3>
                <p>{data.email}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">First Name:</h3>
                <p>{data.firstName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Last Name:</h3>
                <p>{data.lastName}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Phone:</h3>
                <p>{data.phone}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Address:</h3>
                <p>{data.address}</p>
              </div>

              {walletLinked ? (
                <div>
                  <h3 className="text-lg font-semibold">Web3 Wallet address:</h3>
                  <p>{data.walletAddress}</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold">Web3 Wallet address not set</h3>
                  <p className="text-sm text-gray-500">Please connect your wallet to link it with your profile.</p>

                  {/* Button to Show MetaMask Instructions or Connect Wallet */}
                  {isMetaMaskInstalled ? (
                    <button
                      onClick={connectWallet}
                      className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
                      disabled={loading}
                    >
                      {loading ? 'Connecting...' : 'Connect Wallet with MetaMask'}
                    </button>
                  ) : (
                    <div className="mt-4">
                      <p className="text-red-500">MetaMask is not installed.</p>
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
                  {walletError && <p className="mt-2 text-red-500">{walletError}</p>}
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/profile/update"
              className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
            >
              Update Profile
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p>Loading user profile...</p>
        </div>
      )}
    </div>
  );
};

export default UserProfileComp;
