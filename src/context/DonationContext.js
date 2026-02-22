import { createContext, useState, useContext } from 'react';

const DonationContext = createContext();

export const useDonation = () => useContext(DonationContext);

export const DonationProvider = ({ children }) => {
    const [totalDonated, setTotalDonated] = useState(0);
    const [familiesSupported, setFamiliesSupported] = useState(0);
    const [campaignsContributed, setCampaignsContributed] = useState(0);
    const [donationHistory, setDonationHistory] = useState([]);
    const [contributedCampaignIds, setContributedCampaignIds] = useState([]);

    const addDonation = (donationData) => {
        const { campaignId, donationType, amount, isRecurring, paymentMethod } = donationData;

        setTotalDonated((prev) => prev + amount);
        setFamiliesSupported((prev) => prev + Math.floor(amount / 500));

        if (campaignId && !contributedCampaignIds.includes(campaignId)) {
            setContributedCampaignIds((prev) => [...prev, campaignId]);
            setCampaignsContributed((prev) => prev + 1);
        } else if (!campaignId) {
            setCampaignsContributed((prev) => prev + 1);
        }

        const entry = {
            id: Date.now().toString(),
            campaignId,
            donationType,
            amount,
            isRecurring,
            paymentMethod,
            date: new Date().toISOString(),
        };
        setDonationHistory((prev) => [entry, ...prev]);
    };

    return (
        <DonationContext.Provider
            value={{
                totalDonated,
                familiesSupported,
                campaignsContributed,
                donationHistory,
                addDonation,
            }}>
            {children}
        </DonationContext.Provider>
    );
};

export default DonationContext;
