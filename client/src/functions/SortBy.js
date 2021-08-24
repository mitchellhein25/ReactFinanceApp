export function sortBy(prop) {
    return function(a, b) {
      const alloA = a[prop];
      const alloB = b[prop];
      let comparison = 0;
      if (alloA > alloB) {
        comparison = 1;
      } else if (alloA < alloB) {
        comparison = -1;
      }
      return comparison * -1;
    }
  }