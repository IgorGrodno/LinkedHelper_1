function sostavChisla(massivChisel, chislo) {
  let tmpArr = [];
  for (let i = 0; i < massivChisel.length; i++) {
    if (massivChisel[i] <= chislo) {
      tmpArr.push(massivChisel[i]);
    }
  }
  let result = [];
  if (tmpArr[tmpArr.length - 1] === chislo) {
    result.push([tmpArr.pop()]);
  }
  let dp = [];
  printAllSubsets(tmpArr, tmpArr.length, chislo);
  function printAllSubsets(arr, n, sum) {
    if (n == 0 || sum < 0) return;
    for (let i = 0; i < n; i++) {
      dp[i] = [];
      for (let j = 0; j < sum + 1; j++) dp[i].push(false);
    }
    for (let i = 0; i < n; i++) dp[i][0] = true;
    if (arr[0] <= sum) dp[0][arr[0]] = true;
    for (var i = 1; i < n; i++) {
      for (let j = 0; j < sum + 1; j++) {
        if (arr[i] <= j) dp[i][j] = dp[i - 1][j] || dp[i - 1][j - arr[i]];
        else dp[i][j] = dp[i - 1][j];
      }
    }
    p = [];
    printSubsetsRec(arr, n - 1, sum, p);
  }

  function printSubsetsRec(arr, i, sum, p) {
    if (i === 0 && sum !== 0 && dp[0][sum] !== 0) {
      p.push(arr[i]);
      result.push(p.sort());
      p = [];
      return;
    }
    if (i == 0 && sum == 0) {
      result.push(p.sort());
      p = [];
      return;
    }
    if (dp[i - 1][sum]) {
      b = [...p];
      printSubsetsRec(arr, i - 1, sum, b);
    }
    if (sum >= arr[i] && dp[i - 1][sum - arr[i]]) {
      p.push(arr[i]);
      printSubsetsRec(arr, i - 1, sum - arr[i], p);
    }
  }
  return result;
}

function compareNumericArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  arr1 = [...arr1].sort();
  arr2 = [...arr2].sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}

function compareArraysOfNumericArrays(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  for (let el1 of arr1) {
    if (arr2.findIndex((el2) => compareNumericArrays(el1, el2)) < 0) {
      return false;
    }
  }

  return true;
}

runTests();

function runTests() {
  const tests = [
    {
      chislo: 5,
      massivChisel: [8, 2, 3, 4, 6, 7, 1],
      result: [
        [2, 3],
        [4, 1],
      ],
    },
    {
      chislo: 99,
      massivChisel: [8, 2, 3, 4, 6, 7, 1],
      result: [],
    },
    {
      chislo: 8,
      massivChisel: [1, 2, 3, 4, 5, 6, 7, 8],
      result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]],
    },
    {
      chislo: 8,
      massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
      result: [[1, 3, 4], [1, 2, 5], [3, 5], [2, 6], [1, 7], [8]],
    },
    {
      chislo: 15,
      massivChisel: [7, 8, 3, 4, 5, 6, 1, 2],
      result: [
        [1, 2, 3, 4, 5],
        [2, 3, 4, 6],
        [1, 3, 5, 6],
        [4, 5, 6],
        [1, 3, 4, 7],
        [1, 2, 5, 7],
        [3, 5, 7],
        [2, 6, 7],
        [1, 2, 4, 8],
        [3, 4, 8],
        [2, 5, 8],
        [1, 6, 8],
        [7, 8],
      ],
    },
  ];

  let errors = 0;
  for (const test of tests) {
    let result;
    try {
      result = sostavChisla(test.massivChisel, test.chislo);

      if (!compareArraysOfNumericArrays(result, test.result)) {
        errors++;
        console.log("--------------------------------------------");
        console.log("failed for test", test, "Got result", result);
      }
    } catch (e) {
      errors++;
      console.log("failed for", test, "exception", e.message);
    }
  }

  if (errors === 0) {
    console.log("checkStringForBracects test successfuly completed");
  } else {
    console.log(`checkStringForBracects test failed with ${errors} errors`);
  }
}
