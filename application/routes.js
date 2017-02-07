const route = require('../core/router');

route.add('test', '/test/(a)/(all)', 'test', {
    a : '\\d+',
    all : '.+'
});

route.add('home', '/', 'home');