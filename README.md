# Findr
A compatibility-based "FriendFinder" application also known as a dating app

### Overview

This full-stack site will take in results from users' surveys, then compare their answers with those already in database. The app will then display the name and picture with the best overall match.

This app uses Express to handle routing. 


### Deployed Link:
https://villain-findr.herokuapp.com/


### Design Plan

1. The survey has 10 questions. Each answer will be on a scale of 1 to 5 based on how much the user agrees or disagrees with a question.

2. The `server.js` file will require the basic npm packages like `express` and `path`.

3. The `htmlRoutes.js` file will include two routes:

   * A GET Route to `/survey` which will display the survey page.
   * A default, catch-all route that leads to `home.html` which displays the home page.

4. The `apiRoutes.js` file contains two routes:

   * A GET route with the url `/api/list/:gender`. This will be used to display a JSON of all possible match that matches the gender specified by the user.
   * A POST routes `/api/match`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

5. The application's data is inside of `app/data/prospects.js` as an array of objects. Each of these objects follow the format below.

```json
{
  "name":"Ahmed",
  "image":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

6. The app will determine the user's most compatible match using the following:

   * Will convert each user's results into a simple array of numbers (ex: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`).
   * With that done, will compare the difference between current user's scores against those from the database, question by question. Then add up the differences to calculate the `totalDifference`.
     * Example:
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
   * Will use the absolute value of the differences.The app will calculate both `5-3` and `3-5` as `2`, and so on.
   * The closest match will be the user with the least amount of difference.

7. Once the current user's most compatible match is found, the result will be displayed as a modal pop-up.
   * The modal will display both the name, picture of the closest match, and the details of the match and user's survey scores.
