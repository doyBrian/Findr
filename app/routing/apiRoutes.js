var villains = require("../data/prospects");

module.exports = function(app) {

    app.get("/api/list/:gender", function(req, res) {

        var chosen = req.params.gender;

        console.log(chosen);

        if (chosen === "male")
            return res.json(villains.slice(0,7));
        else if (chosen === "female")
            return res.json(villains.slice(7));
        else
            return res.json(villains);
      });


    app.post("/api/match", function(req, res) {

        const data = req.body.score;
        console.log(data);

        var index_max, index_min;
        if (req.body.gender === "male") {
            index_max = 7;
            index_min = 0;
        } else if (req.body.gender === "female") {
            index_min = 7;
            index_max = 14;
        } else {
            index_max = 14;
            index_min = 0;
        }
            
        // convert elements to integers
        const A = data.map(Number);

        var score_tally = [];

        // get difference for each element between arrays,
        for (let i = index_min; i < index_max; i++) {
            var C = [];
            var sum = 0;
            var B = villains[i].score;
            console.log(A);
            console.log(B);

            for (let j = 0; j < B.length; j++) {
                C.push(Math.abs(A[j] - B[j]));
                sum += C[j];
            }
            console.log(C);
            console.log(sum);
            //get total difference and push in new array,
            score_tally.push(sum);
        }
        
        console.log(score_tally);

        // find the least number in the score_tally    
        var smallest_element = score_tally[0]; //let, first element is the smallest one
        for(let k = 1; k < score_tally.length; k++)  
        {
            if(score_tally[k] < smallest_element)
                smallest_element = score_tally[k];
        }

        console.log(smallest_element);
        
        // get the index of closest match, push to new array
        var indices = [];
        var idx = score_tally.indexOf(smallest_element);
        while (idx != -1) {
            indices.push(idx);
            idx = score_tally.indexOf(smallest_element, idx + 1);
        }
        console.log(indices);
        
        var match = [];
        indices.forEach(function(index) {
            if (req.body.gender === "female")
                match.push(villains[index+7]);
            else
                match.push(villains[index]);
        });

        console.log(match);
        return res.json(match);
    });
}