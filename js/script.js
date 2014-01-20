function PageSlider(id) {

    this.$s = function (s) {
        return $(this.sliderId + s);
    }

    this.sliderId = '#' + id + ' ';
    this.pageIndex = 0;
    this.pageCount = this.$s('.pages .page').length;
    this.pageWidth = this.$s('.pages .page').first().width();

    this.changePage = function () {
        var pageWidth = this.pageWidth,
            pageIndex = this.pageIndex;

        this.$s('.pages .page').each(function (index) {
            $(this).css('margin-left', pageWidth * (index - pageIndex));
        });
    };

    this.initPages = function () {
        var pageWidth = this.pageWidth;
        
        if (this.pageCount > 1) {
            this.$s('.pages .page').each(function (index) {
                $(this).css('margin-left', pageWidth * index);
            });
        } else {
            this.$s('.controls').hide();
        }

        this.$s('.pages .page').css('display', 'block');
    };

    this.previous = function () {
        this.pageIndex = (this.pageIndex > 0) ? this.pageIndex - 1 : 0;
        this.changePage();
    };

    this.next = function () {
        this.pageIndex = (this.pageIndex < this.pageCount - 1) ? this.pageIndex + 1 : this.pageCount - 1;
        this.changePage();
    };
}

$(function () {
    var pagesliders = {},
        pageslider,
        pagesliderId;

    $('.pageslider').each(function (e) {
        pagesliderId = $(this)[0].id;
        pageslider = new PageSlider(pagesliderId);
        pageslider.initPages();
        pagesliders[pagesliderId] = pageslider;
    });

    $('.controls .previous').click(function(e) {
        var $controls = $(this).parent(),
            $slider = $($controls).parent(),
            instance = pagesliders[$slider[0].id];
        instance.previous();
    });

    $('.controls .next').click(function(e) {
        var $controls = $(this).parent(),
            $slider = $($controls).parent(),
            instance = pagesliders[$slider[0].id];
        instance.next();
    });
});