using namespace QPI;
struct TrustScoreCounter : public ContractBase
{
public:
    struct IncrementPayment_input {
        identity tenant;
    };
    struct GetTrustScore_input {
        identity tenant;
    };
    struct GetTrustScore_output {
        uint8 score;
        uint64 totalPayments;
        uint64 successfulPayments;
    };
    struct Init_input {
        identity admin;
    };
private:
    identity admin;
    struct TenantInfo {
        uint64 totalPayments;
        uint64 successfulPayments;
    };
    map<identity, TenantInfo> tenants;

    // Initialize with admin
    PUBLIC_PROCEDURE(Init)
        assert(msg.sender != identity::null());
        admin = input.admin;
    _
    
    // Increment successful payments for a tenant
    PUBLIC_PROCEDURE(IncrementPayment)
        assert(msg.sender == admin);
        auto& t = tenants[input.tenant];
        t.totalPayments++;
        t.successfulPayments++;
    _
    
    // Get the current trust score for a tenant
    PUBLIC_FUNCTION(GetTrustScore)
        auto& t = tenants[input.tenant];
        if (t.totalPayments > 0)
            output.score = (t.successfulPayments * 10) / t.totalPayments;
        else
            output.score = 0;
        output.totalPayments = t.totalPayments;
        output.successfulPayments = t.successfulPayments;
    _
    
    // Register function and procedure with IDs
    REGISTER_USER_FUNCTIONS_AND_PROCEDURES
        REGISTER_USER_PROCEDURE(Init, 1);
        REGISTER_USER_PROCEDURE(IncrementPayment, 2);
        REGISTER_USER_FUNCTION(GetTrustScore, 1);
    _
    
    // Initial state setup
    INITIALIZE
        admin = identity::null();
    _
};
