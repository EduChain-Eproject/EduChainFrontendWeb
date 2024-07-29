class Failure extends Error {
  constructor(
    public message: string,
    public code?: number,
    public errors?: Record<string, string>,
    public type?: string,
  ) {
    super(message);
    this.name = 'Failure';
  }
}

export default Failure;