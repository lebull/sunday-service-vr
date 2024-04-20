import { nextSundayServiceDefaultDateTime } from '../util/util';
import { Event } from '../util/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../util/firebase';
 
export const saveEvent = async (event: Event) => {
    event.id = "current";
    // localStorage.setItem("event", JSON.stringify(event));
    await setDoc(doc(db, "events", event.id), event);
    alert("Event Saved")
}

export const loadEvent = async () => {
    const docRef = await getDoc(doc(db, "events", "current"));
    const data = docRef.data();
    if(data) {
      const event = {
        ...data,
        start_datetime: data.start_datetime.toDate()
      } as Event;
      return event;
    }
  return null;
}

export const default_event: Event = {
    id: "current",
    name: "Sunday Service",
    start_datetime: nextSundayServiceDefaultDateTime(),
    host: "",
    message: "Come by to chill and wiggle to some Sunday Service tunes!",
    slots: [],
    footer: "https://discord.s4vr.net/\nhttps://twitch.s4vr.net/",
}

export enum EventActionType {
    SetEvent = "SETEVENT",
    Reset = "RESET",
}

export type EventAction = {
    type: EventActionType,
    payload?: Event
}

 // https://devtrium.com/posts/how-to-use-react-usereducer-hook
 export function eventStateReducer(state: Event, action: EventAction): Event {
    switch (action.type) {
      case EventActionType.SetEvent:
        if (action.payload !== undefined) {
          const event = { ...action.payload };
          calcSlotTimes(event);
          return event;
        } else {
          throw new Error("Expected an payload to be populated, but it was undefined");
        }
      case EventActionType.Reset:
        saveEvent(default_event);
        return default_event;
      default:
        throw new Error();
    }
  }

  const calcSlotTimes = (event: Event): Event => {
    const newEvent =  {...event}; // Shallow Copy

    const ONE_HOUR = 60*60*1000;

    const time_counter = new Date(newEvent.start_datetime);
    for(let i = 0; i < event.slots.length; i++){
        event.slots[i].startTime = new Date(time_counter);
        time_counter.setTime(time_counter.getTime() + ONE_HOUR * event.slots[i].duration);
    }

    return newEvent;
}