// 학생 식당 메뉴

var router = require('express').Router();
let request = require('request');

/* GET DATES */
var today = new Date();
var day_v = today.getDate();
var month_v = today.getMonth()+1;
var year_v = today.getFullYear();


/* GET home page. */
var url = 'https://bablabs.com/openapi/v1/campuses/BVRPhfbjvn/stores/LTI0MTE0NTE5?date=2019-11-26';
var headers = {
    'accesstoken': ''
};
var query = {
    type: "null",
    date: "2019-11-26"
};

var menu1;
var menu2;
var menu3;

function getMenus(URL, HEADERS, QUERY){
    return new Promise(resolve=>{
        request({url: URL, headers: HEADERS, query: QUERY}, function(err, res, body){
            var result = JSON.parse(body);
            // console.log(result.store);
            var menu1 = result.store.menus[0].description;
            var menu2 = result.store.menus[1].description;
            var menu3 = result.store.menus[2].description;
            console.log(menu1);
            console.log(menu2);
            console.log(menu3);

            resolve(result)
        })
    })
}

router.get('/', function (req, res) {
    getMenus(url, headers, query)
    .then(function(result){
        m1 = result.store.menus[0].description;
        m2 = result.store.menus[1].description;
        m3 = result.store.menus[2].description;
        res.render('haksik', {
            menu1: m1,
            menu2: m2,
            menu3: m3
        })
    })
});

// router.get('/', function (req, res) {

//     async function menus(){
//         var menuu = await getMenus(url, headers, query)
//         return menuu
//     }
//     all_m = menus()
//     console.log(all_m[0]);
//     res.render('haksik', {
//         menu1: all_m[0],
//         menu2: all_m[1],
//         menu3: all_m[2]
//     })
// });

// router.get('/', function (req, res) {
//     request.get({url: url, headers: headers, query: query}, function(err, res, body){
//         var result = JSON.parse(body);
//         menu1 = result.store.menus[0].description;
//         menu2 = result.store.menus[1].description;
//         menu3 = result.store.menus[2].description;
//         console.log(menu1);
//         console.log(menu2);
//         console.log(menu3);
//     })
//     res.render('haksik', {
//         menu1: menu1,
//         menu2: menu2,
//         menu3: menu3
//     })
// });

module.exports = router;

// 학생식당: LTI0MTE0NTE5
// 창의인재원식당: LTI0MTEyNjM2
// 교직원식당: LTI0MTE2NDAw
// 창업보육센터: LTI0MTA4ODY0
// 푸트코드: LTI0MTEwNzUx

// - 문제점 -
// 토요일이나 일요일에 열지않는 학생식당처럼
// 메뉴가 없는 날은 페이지가 뜨지 않음
// 해결방법 : 메뉴가 없는 날은 메뉴가 없다고 뜨도록 설정
