using namespace QPI;

struct HM252
{
};

struct TrustScore : public ContractBase
{
public:
    struct Increment_input {};
    struct Increment_output {};

    struct GetScore_input {};
    struct GetScore_output
    {
        uint64 value;
    };

private:
    uint64 score;

    // Procedure: Increase the trust score by 1
    PUBLIC_PROCEDURE(Increment)
        state.score++;
    _

    // Function: Return the current trust score
    PUBLIC_FUNCTION(GetScore)
        output.value = state.score;
    _

    REGISTER_USER_FUNCTIONS_AND_PROCEDURES
        REGISTER_USER_PROCEDURE(Increment, 1);
        REGISTER_USER_FUNCTION(GetScore, 1);
    _

    INITIALIZE
        state.score = 19;
    _
};
