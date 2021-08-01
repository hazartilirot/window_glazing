//export default (elementId, setOfferEnds) => {
export default (setDateOfferEnds) => {
  const addZero = (number) => number <= 9 ? '0' + number : number;
  
  const getTimeRemaining = (timerEnds) => {
    const time = Date.parse(timerEnds) - Date.parse(new Date());

    return {
      total: time,
      seconds: (time / 1000 % 60) | 0,
      minutes: (time / (1000 * 60)) % 60 | 0,
      hours: (time / (1000 * 60 * 60)) % 24 | 0,
      days: (time / (1000 * 60 * 60 * 24)) | 0,
    }
  }
  
  const showTimerClock = (timerEnds) => {
    const seconds = document.getElementById('seconds');
    const minutes = document.getElementById('minutes');
    const hours = document.getElementById('hours');
    const days = document.getElementById('days');
    
    const updateTimer = () => {
      const remaining = getTimeRemaining(timerEnds);
      if (remaining.total === 0) {
        clearInterval(interval);
        return
      }
      seconds.textContent = addZero(remaining.seconds);
      minutes.textContent = addZero(remaining.minutes);
      hours.textContent = addZero(remaining.hours);
      days.textContent = addZero(remaining.days);
    }
    
    const interval = setInterval(updateTimer, 1000);
    
    updateTimer();
  }
  showTimerClock(setDateOfferEnds)
}