export default {
  getMessage: async () => {
    let promise = new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve({
            title: "Message title",
            body: `Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
            commodo consequat`
          }),
        3000
      );
    });

    return await promise;
  }
};
