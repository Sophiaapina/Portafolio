var names = []

app.route('/').

    get((req,res)=>{

        res.render(__dirname+"/html/index.html", { names: names });

    }).

    post((req,res) =>{

        var name = req.body.name;

        names.push(name);

        res.render(__dirname+"/html/index.html", { names: names });

    });