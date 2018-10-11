Demo Document
=============

**Table of content with `@[toc]` for HTML and PDF**

@[toc]

Paragraphs are separated by a blank line.

New line... Some changes... :)

And ... :grin: :sweat_smile: some :innocent: emojis :unamused: :angry: ... :speak_no_evil:

2nd paragraph. *Italic*, **bold**, and `monospace`. Itemized lists look like:

-	this one
-	that one
-	the other one

Note that --- not considering the asterisk --- the actual text content starts at 4-columns in.

Convert arrows like `-->` or `==>` to --> or ==>

```
--> →
<-- ←
<--> ↔
==> ⇒
<== ⇐
<==> ⇔
```

> Block quotes are written like so.
>
> They can span multiple paragraphs, if you like.

Use 3 dashes for an em-dash. Use 2 dashes for ranges (ex., "it's all in chapters 12--14"). Three dots ... will be converted to an ellipsis. Unicode is supported. ☺

Write a todo list
-----------------

... with list :checkered_flag:

-	[ ] Step 1
-	[x] Step 2
-	[x] Step 3

... without list :checkered_flag:

[ ] Step 1

[x] Step 2

[x] Step 3

A very long headline for TOC testing... Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

...

<div class="page-break"></div>

An h2 header
------------

Here's a numbered list:

1.	first item
2.	second item
3.	third item

<div class="page-break"></div>

Here's a code sample:
---------------------

```bash
#!/bin/bash

###### CONFIG
ACCEPTED_HOSTS="/root/.hag_accepted.conf"
BE_VERBOSE=false

if [ "$UID" -ne 0 ]
then
 echo "Superuser rights required"
 exit 2
fi

genApacheConf(){
 echo -e "# Host ${HOME_DIR}$1/$2 :"
}
```

(which makes copying & pasting easier). You can optionally mark the delimited block for Pandoc to syntax highlight it:

```python
import time
# Quick, count to ten!
for i in range(10):
    # (but not *too* quick)
    time.sleep(0.5)
    print i
```

Long liner `38029ecd84f18db3e425967dbb75e4bb8c02ff6a3f1c546446532069432a6c854a0ee12d35282751360686ec666832c6b9dda169298dcb923b09b0d7f72d4d7a` as inline code.

Long liner

```
38029ecd84f18db3e425967dbb75e4bb8c02ff6a3f1c546446532069432a6c854a0ee12d35282751360686ec666832c6b9dda169298dcb923b09b0d7f72d4d7a
```

as code block.

<div class="page-break"></div>

### An h3 header

Now a nested list:

1.	First, get these ingredients:

	-	carrots
	-	celery
	-	lentils

2.	Boil some water.

3.	Dump everything in the pot and follow this algorithm:

	```
	find wooden spoon
	uncover pot
	stir
	cover pot
	balance wooden spoon precariously on pot handle
	wait 10 minutes
	goto first step (or shut off burner when done)
	```

	Do not bump wooden spoon or it will fall.

Notice again how text always lines up on 4-space indents (including that last line which continues item 3 above).

Here's a link to [a website](http://foo.bar).

> Move the following to next page with `<div class="page-break"></div>`.

<div class="page-break"></div>

Some Headlines.

Headline 1
==========

Headline 2
----------

### Headline 3

#### Headline 4

##### Headline 5

###### Headline 6

<div class="page-break"></div>

Tables can look like this:

| Lorem            | Ipsum                                                    | Dolor                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|------------------|----------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Lorem ipum dolor | Lorem ipsum dolor sit amet, consectetur adipisicing elit | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. |
| Lorem ipum dolor | Lorem ipum dolor                                         | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. |
| Lorem ipum dolor | Lorem ipum dolor                                         | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. |

<div class="page-break"></div>

### External image

```markdown
![external image](http://placehold.it/900x250/000/FFF)
```

![external image](http://placehold.it/900x250/000/FFF)

### Local image

Local image with relative path.

```markdown
![local image](example.png)
```

![local image](./img/example.png)

<div class="page-break"></div>

And note that you can backslash-escape any punctuation characters which you wish to be displayed literally, ex.: \`foo\`, \*bar\*, etc.

Anbei testen wir ein paar Umlaute und Sonderzeichen...

> Äußerst schön verändert

<div class="page-break"></div>

Testing some HTML code
----------------------

Image with relative path...

```html
<img src="./img/example.png" alt="Image with relative path" />
```

<img src="./img/example.png" alt="IMG RELATIVE" />

<br /><br>

Image external...

```html
<img src="http://placehold.it/900x250/f3330b/fff" alt="Image external" />
```

<img src="http://placehold.it/900x250/f3330b/fff" alt="IMG EXTERNAL" />
