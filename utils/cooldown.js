let usersInTimeout = [];
export default async function cooldown(id, timeoutDelay, m, action) {
  try {
    if (usersInTimeout.some((user) => user.userID == id)) {
      let userInTimeout = usersInTimeout.find((user) => user.userID == id);
      let remainingTime =
        timeoutDelay - (new Date().getTime() - userInTimeout.timeoutStart);
      return m.reply(
        "text",
        null,
        `Time left to use the command: *_${remainingTime / 1000} sec_*`,
      );
    }
    await action();
    usersInTimeout.push({ userID: id, timeoutStart: new Date().getTime() });
    setTimeout(() => {
      usersInTimeout.splice(usersInTimeout.indexOf(id), 1);
    }, timeoutDelay);
  } catch (error) {
    console.log(error);
  }
}
