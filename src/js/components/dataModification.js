class DataModification {
  constructor() {
  }

  getDate(item) {
    const rDate = new Date(item.release_date);
    return rDate.getFullYear();
  }

  getGenres(arr, genresArr) {
    // let newArr = [];
    // for (let i = 0; i < arr.length; i++) {
    //   for (let j = 0; j < genresArr.length; j++) {
    //     if (genresArr[j].id == arr[i]) {
    //       newArr.push(genresArr[j].name);
    //     }
    //   }
    // }
    // newArr.splice(3);
    // return newArr.join(', ');
    // }
    //   const newArr =
    const newArr = genresArr
      .filter(genreObj => arr.includes(genreObj.id))
      .map(genre => genre.name)
      .slice(0, 3)
      .join(', ');

    return newArr;
  }
}

const newDataModification = new DataModification();
export default newDataModification;