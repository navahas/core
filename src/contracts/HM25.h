using namespace QPI;

struct RentContract : public ContractBase {
public:
    struct Init_input {
        identity landlord;
        uint64 rentAmount;
        uint64 commissionPercent; // in basis points, e.g. 200 = 2%
    };

    struct DepositGuarantee_input {
        identity tenant;
        uint64 amount;
    };

    struct DepositRent_input {
        identity tenant;
        uint64 amount;
    };

    struct Claim_input {
        identity tenant;
    };

    struct GetState_output {
        uint64 tenantBalance;
        uint64 owedToLandlord;
        uint8 trustScore;
        bool hasPaidGuarantee;
    };

private:
    identity landlord;
    uint64 rentAmount;
    uint64 commissionPercent;

    struct TenantInfo {
        uint64 balance;
        uint8 totalPayments;
        uint8 successfulPayments;
        bool hasPaidGuarantee;
    };

    map<identity, TenantInfo> tenants;

    PUBLIC_PROCEDURE(Init)
        assert(msg.sender != identity::null());
        landlord = input.landlord;
        rentAmount = input.rentAmount;
        commissionPercent = input.commissionPercent;
    _

    PUBLIC_PROCEDURE(DepositGuarantee)
        assert(msg.asset_in == "QUSD");

        auto& t = tenants[input.tenant];

        uint8 score = 0;
        if (t.totalPayments > 0)
            score = (t.successfulPayments * 10) / t.totalPayments;

        uint64 requiredGuarantee;
        if (score >= 10)
            requiredGuarantee = rentAmount / 2;
        else if (score <= 5)
            requiredGuarantee = rentAmount;
        else
            requiredGuarantee = rentAmount * (10 - score) / 10;

        assert(input.amount >= requiredGuarantee);
        assert(!t.hasPaidGuarantee);

        t.balance += input.amount;
        t.hasPaidGuarantee = true;
    _

    PUBLIC_PROCEDURE(DepositRent)
        assert(msg.asset_in == "QUSD");

        auto& t = tenants[input.tenant];

        assert(t.hasPaidGuarantee);
        assert(input.amount == rentAmount);

        t.balance += input.amount;
        t.totalPayments++;
        t.successfulPayments++;
    _

    PUBLIC_PROCEDURE(Claim)
        assert(msg.sender == landlord);

        auto& t = tenants[input.tenant];
        uint64 amount = t.balance;
        assert(amount > 0);

        uint64 commission = (amount * commissionPercent) / 10000;
        uint64 payout = amount - commission;

        transfer_asset(landlord, "QUSD", payout);
        t.balance = 0;
    _

    PUBLIC_FUNCTION(GetState)
        auto& t = tenants[msg.sender];
        output.tenantBalance = t.balance;
        output.owedToLandlord = t.balance - ((t.balance * commissionPercent) / 10000);

        if (t.totalPayments > 0)
            output.trustScore = (t.successfulPayments * 10) / t.totalPayments;
        else
            output.trustScore = 0;

        output.hasPaidGuarantee = t.hasPaidGuarantee;
    _

    REGISTER_USER_FUNCTIONS_AND_PROCEDURES
        REGISTER_USER_PROCEDURE(Init, 1);
        REGISTER_USER_PROCEDURE(DepositGuarantee, 2);
        REGISTER_USER_PROCEDURE(DepositRent, 3);
        REGISTER_USER_PROCEDURE(Claim, 4);
        REGISTER_USER_FUNCTION(GetState, 1);
    _

    INITIALIZE
    _
};
