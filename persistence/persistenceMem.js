class persistenceMem {
  constructor() {
    this.array = [];
  }
  async init() {
    console.log("Products dao in mem");
  }

  async disconnect() {
    console.log("Disconnect Products dao in mem");
  }
}

export default new persistenceMem();
