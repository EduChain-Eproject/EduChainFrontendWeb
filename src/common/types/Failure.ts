class Failure extends Error {
    constructor(public message: string, public code: number) {
        super(message);
        this.name = "Failure";
    }
}

export default Failure;
