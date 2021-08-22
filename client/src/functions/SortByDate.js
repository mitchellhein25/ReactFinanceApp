//sort by date, descending
export function sortByDate(a, b) {

    const sortA = a.date;
    const sortB = b.date;
  
    let comparison = 0;
    if (sortA > sortB) {
      comparison = 1;
    } else if (sortA < sortB) {
      comparison = -1;
    }
    return comparison;
  }