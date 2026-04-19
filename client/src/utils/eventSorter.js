export const sortEventsPriority = (events) => {
  if (!Array.isArray(events)) return [];

  const now = new Date();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  const p1_deadlineSoon = [];
  const p2_startingSoon = [];
  const p3_others = [];
  const p4_expired = [];

  events.forEach((event) => {
    let handled = false;

    // Check if deadline has already passed
    if (event.deadline && new Date(event.deadline) < now) {
      p4_expired.push(event);
      handled = true;
    } 
    // Check if registration deadline is expiring within 24 hours
    else if (
      event.deadline && 
      new Date(event.deadline) >= now && 
      (new Date(event.deadline).getTime() - now.getTime()) <= ONE_DAY_MS
    ) {
      p1_deadlineSoon.push(event);
      handled = true;
    }
    // Check if event start date is within 24 hours
    else if (
      event.eventDate && 
      new Date(event.eventDate) >= now && 
      (new Date(event.eventDate).getTime() - now.getTime()) <= ONE_DAY_MS
    ) {
      p2_startingSoon.push(event);
      handled = true;
    }

    // Regular active events
    if (!handled) {
      p3_others.push(event);
    }
  });

  // Sort sub-groups by earliest date first to make it even more intuitive
  p1_deadlineSoon.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  p2_startingSoon.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  p3_others.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  
  // As per requirement: Priority 1 -> Priority 2 -> Others -> Expired
  return [...p1_deadlineSoon, ...p2_startingSoon, ...p3_others, ...p4_expired];
};
