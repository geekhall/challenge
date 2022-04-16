const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step })

// usage
range(0, 4, 1) // [0, 1, 2, 3, 4]
range(1, 10, 2) // [1, 3, 5, 7, 9]
// range('A'.charCodeAt(0), 'Z'.charCodeAt(0), 1)
//   .map((x) => String.fromCharCode(x))
