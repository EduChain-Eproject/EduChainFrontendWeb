class Failure extends Error {
  constructor(
    public message: string,
    public errors: { [key: string]: string },
    public timestamp?: string,
  ) {
    super(message);
    this.name = 'Failure';
  }
}

export default Failure;
