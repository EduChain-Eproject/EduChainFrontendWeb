import React, { useState } from 'react';
import { Certification, CertificationStatus } from "../../../../../../common/entities/Certification";
import { useAppDispatch, useAppSelector } from '../../../../../../common/context/store';
import { approveRejectCertification, CertificationAction } from '../../data/services/handleApproveRejectCertification';
import Modal from '../../../../../../common/components/Modals/Modal';

const CertificationList: React.FC<{ certifications: Certification[] }> = ({ certifications }) => {
    const dispatch = useAppDispatch();
    const { status, error } = useAppSelector(state => state.courses.teacher.courseDetailPage);

    const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);
    const [action, setAction] = useState<CertificationAction | null>(null);
    const [comments, setComments] = useState<string>('');

    const openModal = (certification: Certification, actionType: CertificationAction) => {
        setSelectedCertification(certification);
        setAction(actionType);
        setComments(''); // Reset comments on opening
    };

    const handleSubmit = () => {
        if (selectedCertification && action) {
            dispatch(approveRejectCertification({
                certificationId: selectedCertification.id!,
                action,
                comments
            }));
            closeModal(); // Close the modal after submission
        }
    };

    const closeModal = () => {
        setSelectedCertification(null);
        setAction(null);
    };

    if (!certifications || certifications.length === 0) {
        return <p className="text-center text-gray-500">No certifications found.</p>;
    }
    if (status == 'approve or reject failed' && error) {
        return <p className="text-center text-red-500">{error}</p>;
    } else if (status == 'approving or rejecting') {
        return <p className="text-center text-gray-500">Approving or rejecting certification...</p>;
    }

    return (
        <>
            <div className="space-y-4">
                {certifications.map((certification) => (
                    <div key={certification.id} className="p-4 border rounded-lg shadow-sm">
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="font-semibold">
                                    {certification.userDto?.firstName} {certification.userDto?.lastName}
                                </p>
                                <p className="text-sm text-gray-600">{certification.userDto?.email}</p>
                                {certification.userDto?.walletAddress
                                    ? <p className="text-sm text-gray-600">Address: {certification.userDto?.walletAddress}</p>
                                    : (<p className="text-sm text-red-500">User have not link his/her wallet. You can't certify </p>
                                    )
                                }
                            </div>
                            <div>
                                {certification.status === CertificationStatus.PENDING ? (
                                    <div className="flex space-x-2">
                                        <button
                                            className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600 focus:outline-none"
                                            onClick={() => openModal(certification, CertificationAction.APPROVE)}
                                            disabled={!certification.userDto?.walletAddress}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 focus:outline-none"
                                            onClick={() => openModal(certification, CertificationAction.REJECT)}
                                            disabled={!certification.userDto?.walletAddress}
                                        >
                                            Reject
                                        </button>
                                    </div>
                                ) : certification.status === CertificationStatus.CERTIFIED ? (
                                    <span className="text-green-500 font-semibold">Certified</span>
                                ) : (
                                    <span className="text-red-500 font-semibold">Rejected</span>
                                )}
                            </div>
                        </div>
                        {certification.issueDate && (
                            <p className="text-sm text-gray-600 mt-2">Issued on: {Certification.getDateString(certification.issueDate)}</p>
                        )}
                        {certification.nftTokenId && (
                            <p className="text-sm text-gray-600 mt-2">NFT Token ID: {certification.nftTokenId}</p>
                        )}

                        {certification.transactionHash && (
                            <span className="text-sm text-gray-600 mt-2 space-x-5">
                                Transaction Hash:
                                <a onClick={() => {
                                    window.open(`https://sepolia.etherscan.io/tx/${certification.transactionHash}`, '_blank');
                                }} className="text-blue-500 hover:underline">
                                    {certification.transactionHash}
                                </a>
                            </span>
                        )}
                        {certification.comments && (
                            <p className="text-sm text-gray-600 mt-2">Comments: {certification.comments}</p>
                        )}
                    </div>
                ))}
            </div >

            {selectedCertification && action && (
                <Modal onClose={closeModal}>
                    <h2 className="text-lg font-bold">
                        {action === CertificationAction.APPROVE ? 'Approve Certification' : 'Reject Certification'}
                    </h2>
                    <p className="mt-2">
                        Are you sure you want to {action === CertificationAction.APPROVE ? 'approve' : 'reject'} this certification?
                    </p>
                    <textarea
                        className="mt-4 p-2 w-full border rounded"
                        placeholder="Add comments (optional)"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />
                    <div className="mt-4 flex justify-end space-x-4">
                        <button
                            className="bg-gray-300 text-black py-1 px-3 rounded hover:bg-gray-400 focus:outline-none"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            className={`py-1 px-3 rounded text-white ${action === CertificationAction.APPROVE ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} focus:outline-none`}
                            onClick={handleSubmit}
                        >
                            {action === CertificationAction.APPROVE ? 'Approve' : 'Reject'}
                        </button>
                    </div>
                </Modal>
            )
            }
        </>
    );
};

export default CertificationList;
