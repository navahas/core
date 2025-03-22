using namespace QPI;

struct HM252
{
};

struct HM25 : public ContractBase
{
public:
    struct Increment_input {};
    struct Increment_output {};

    struct GetCounter_input {};
    struct GetCounter_output
    {
        uint64 value;
    };

private:
    uint64 counter;

    // Procedure: Increment the counter by 1
    PUBLIC_PROCEDURE(Increment)
        state.counter++;
    _

    // Function: Return the current counter value
    PUBLIC_FUNCTION(GetCounter)
        output.value = state.counter;
    _

    // Register function and procedure with IDs
    REGISTER_USER_FUNCTIONS_AND_PROCEDURES
        REGISTER_USER_PROCEDURE(Increment, 1);
        REGISTER_USER_FUNCTION(GetCounter, 1);
    _

    // Initial state setup
    INITIALIZE
        state.counter = 10;
    _
};
