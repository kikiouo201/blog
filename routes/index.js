var express = require('express');
var router = express.Router();


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {

  const db = req.con;
  let data = "";


  const user = req.query.user;

  let filter = "";
  if (user) {
      filter = 'WHERE name = ?';
  }

  db.query('SELECT * FROM article ' + filter, user, function(err, rows) {
      if (err) {
          console.log(err);
      }
      let articles = rows;

      for(let i=0;i<articles.length ; i++){
            let date= articles[i].date;
            let y = date.getFullYear();  
            let m = date.getMonth() + 1;  
            m = m < 10 ? '0' + m : m;  
            let d = date.getDate();  
            d = d < 10 ? ('0' + d) : d;  
            let h = date.getHours();  
            h=h < 10 ? ('0' + h) : h;  
            let minute = date.getMinutes();  
            minute = minute < 10 ? ('0' + minute) : minute; 
            articles[i].date= y + '/' + m + '/' + d+' '+h+':'+minute;  
      }

      // use index.ejs
      res.render('index', { title: 'Account Information', articles: articles, user: user });
     
  });

});
router.post('/', function(req, res, next) {
    
    const db = req.con;
    let dt = new Date();
    

   
   
    let sql = {
        id: req.body.userid,
        name: req.body.name,
        content: req.body.content,
        title: req.body.title,
        date: dt

    };
  
   
    let qur = db.query('INSERT INTO article SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });
});

router.get('/add', function(req, res, next) {

  // use userAdd.ejs
  res.render('userAdd', { title: 'Add User'});
});

router.post('/userAdd', function(req, res, next) {

  const db = req.con;
  let dt = new Date();
  let sql = {
      name: req.body.name,
      content: req.body.content,
      title: req.body.title,
      date: dt
    

  };

  //console.log(sql);
  let qur = db.query('INSERT INTO article SET ?', sql, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

router.get('/userEdit', function(req, res, next) {

  const id = req.query.id;
  const db = req.con;
  let data = "";

  db.query('SELECT * FROM subsidies WHERE id = ?', id, function(err, rows) {
      if (err) {
          console.log(err);
      }

      let data = rows;
      res.render('userEdit', { title: 'Edit Account', data: data });
  });

});

router.post('/userEdit', function(req, res, next) {

  const db = req.con;
  const id = req.body.id;

  let sql = {
      name: req.body.userid
     
  };

  let qur = db.query('UPDATE subsidies SET ? WHERE id = ?', [sql, id], function(err, rows) {
      if (err) {
          console.log(err);
      }

      res.setHeader('Content-Type', 'application/json');
      res.redirect('/');
  });

});

router.get('/userDelete', function(req, res, next) {

  const id = req.query.id;
  const db = req.con;

  let qur = db.query('DELETE FROM subsidies WHERE id = ?', id, function(err, rows) {
      if (err) {
          console.log(err);
      }
      res.redirect('/');
  });
});


module.exports = router;
