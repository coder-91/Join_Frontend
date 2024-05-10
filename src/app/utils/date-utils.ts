import {interval, map, Observable, startWith} from "rxjs";

function getGreetingByTime(hour: number): string {
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

function getCurrentHour(): number {
  return new Date().getHours();
}

function getTimeUntilNextHour(): number {
  const currentMinutes = new Date().getMinutes();
  const currentSeconds = new Date().getSeconds();
  return (60 - currentMinutes) * 60 - currentSeconds;
}

export function getGreetingByTime$(): Observable<string> {
  const delay = getTimeUntilNextHour() * 1000;
  return interval(delay).pipe(
    map(() => getGreetingByTime(getCurrentHour())),
    startWith(getGreetingByTime(getCurrentHour()))
  );
}
