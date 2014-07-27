![CementJS](cementjs.png)
=====================

[CementJS](http://smarchal.com/cementjs) is a jQuery plugin, which will allow you to quickly present a list of elements under a grid layout. It is a [Masonry](http://masonry.desandro.com/) alternative.

Unlike Masonry, CementJS create a real grid : **every row has the same height**, and **every column has the same width**. This doesn't mean your elements can't span over several columns and/or rows.

Installation
------------

1. Download `cement.min.js` (or its unminified version)
2. Include jQuery : `<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>`
3. Include CementJS : `<script src="cement.min.js"></script>`

Basic usage
-----------

For a basic usage, you need to wrap your elements in a container :

	<section id="container">
		<article>...</article>
		<article>...</article>
		<article>...</article>
	</section>

Then, initialize CementJS :

    $('#container').cement();

That's all. CementJS will automatically calculate your elements position, trying to take as less space as possible.

Span over columns and rows
--------------------------

If you want an element to span over 2 columns, use this HTML :

	<article data-w="2">...</article>

In the same manner, you can span over rows (or combine both) :

	<article data-w="2" data-h="3">...</article>

> Both data attributes are initialized to 1 if they're not specified

Options
-------

CementJS provides a few options, to be more flexible :

Option               | Default value | Description 
-------------------- | ------------- | -----
`columns`            | `4`           | Number of columns in your grid. 
`columnMinWidth`     | `0`           | Minimum width the columns can have. Under this width, a column is removed.<br>Set to 0 to keep the same number of columns, whatever their width. 
`brickSelector`      | `> *`         | Target elements inside the container. 
`horizontalGutter`   | `5`           | Size of horizontal gutters. 
`verticalGutter`     | `5`           | Size of vertical gutters. 
`transitionDuration` | `.2s`         | Transition duration. 

Legals
------
- Author : [zessx](https://github.com/zessx)
- Licence : [MIT](http://opensource.org/licenses/MIT) 
- Contact : [@zessx](https://twitter.com/zessx)
- Link  : [http://smarchal.com/cementjs](http://smarchal.com/cementjs)

Donations
---------

[![Buy me a coffee !](http://doc.smarchal.com/bmac)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=KTYWBM9HJMMSE&lc=FR&item_name=Buy%20a%20coffee%20to%20zessx%20%28Samuel%20Marchal%29&currency_code=EUR&bn=PP%2dDonationsBF%3abmac%3aNonHosted)
