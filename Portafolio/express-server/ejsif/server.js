app.route('/').

    get((req,res)=>{

        res.render(__dirname+"/html/index.html", { name: "" });

    }).
    post((req,res) =>{

    });