const arr = [1, 2, 3, 4, 5];
const ITEMS_PER_PAGE = 2;
const page = 1;
const paginated = arr.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
console.log(paginated);
