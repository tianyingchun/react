Scrollbars
==========

- forked code form [reactScrollbar](https://github.com/souhe/reactScrollbar)

``` html
 <ScrollArea
    speed={Number}
    className={String}
    contentClassName={String}
    horizontal={Boolean}
    vertical={Boolean}
    height={Number}
    width={Number}
    amSize={'sm'|'md'}
    >
```

### speed

Scroll speed applied to mouse wheel event. Default: 1

### className

CSS class names added to main scroll area component.

### contentClassName

CSS class names added to element with scroll area content.

### horizontal

When set to false, horizontal scrollbar will not be available. Default: true

### vertical

When set to false, vertical scrollbar will not be available, regardless of the content height. Default: true

### width

The width scrollArea outer container

### height

The height scrollArea outer container

### size

The scrollbar size of scrollArea, optional, only: 'md', 'sm', default is 'md'
