![preview](http://shapiromichael.github.io/Form-JS/logo.png)


### Install
Optionally, you can install Form.js with bower:
```shell
bower install bower install form-jquery
```
Or download the [production version][min] / [development version][max].

[min]: https://raw.githubusercontent.com/shapiromichael/Form-JS/master/dist/form.min.js
[max]: https://raw.githubusercontent.com/shapiromichael/Form-JS/master/dist/form.js

### Requirements
Form.js is working best with jQuery 2.X, however it can work well with older version of jQuery as well 1.11.x
if you're using an older version - you can run the unit test.

### Including files

```html
<script src="//code.jquery.com/jquery-2.1.3.min.js"></script>
<script src="form.min.js"></script>
```

### How to use it
```javascript
$('#my-form').form(function( event ){
	return event.data.form.validate();
});
```


### Compatibility
Form.js is fully functional on all modern browsers, as well as some old ones such as IE 8+. It is also designed to work on touch devices such as mobile phones or tablets.

## License

[![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT)

Copyright (c) 2015 Michael Shapiro & Sinapsa - R&D Center

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
