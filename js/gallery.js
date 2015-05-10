$(document).ready(function() {
    var galleryPath, thumbnailsPath, filename, thumbPath, imagePath;
    
    var $gallery = $('#gallery');
    var $lightbox = $('#lightbox', $gallery);
    
    $lightbox.on('click', function () {
        $lightbox.fadeOut(400, function () {
            $('.gallery-detail', $lightbox).remove();
        });
    });
    
    function showLightbox(e) {
        e.preventDefault();
        
        var spinner = new Spinner(opts).spin($lightbox[0]);
        
        var imagePath = $(e.currentTarget).attr('href');
        var $imageTag = $(document.createElement('img'))
                    .hide()
                    .attr('src', imagePath)
                    .addClass('gallery-detail')
                    .on('load', function(e) {
                        spinner.stop();
                        $imageTag.fadeIn(200);
                    });
        $lightbox.append($imageTag);
        $lightbox.fadeIn(400);
    }
    
    var gallery = $.url(window.location).param('gallery');
    
    // TODO : regex to replace - with space and uppercase gallery title from url //
    //$('#galleryName').text(gallery);
    
    galleryPath = 'images/' + gallery;
    thumbnailsPath = galleryPath + '/thumbs/';
    var fileextension = [".png", ".jpg"];
    
    $.ajax({
        url: 'https://daniellefraboni.github.io/' + thumbnailsPath,
        success: function (data) {
            $(data).find("a:contains(" + (fileextension[0]) + "), a:contains(" + (fileextension[1]) + ")").each(function () {
                filename = this.href.replace(window.location.host, "").replace("https:///", "");
                thumbPath = thumbnailsPath + '/' + filename;
                imagePath = galleryPath + '/' + filename;
                
                var $linkTag = $(document.createElement('a'))
                    .attr('href', imagePath)
                    .on('click', showLightbox);
                
                var $imageTag = $(document.createElement('img'))
                    .addClass('gallery-item')
                    .attr('src', thumbPath);
                    
                $linkTag.append($imageTag).appendTo($gallery);
            });
        }
    });
    
    var opts = {
        color: '#FFF',
        lines: 9,
        length: 0,
        width: 7,
        radius: 11,
        corners: 1.0,
        rotate: 0,
        trail: 60,
        speed: 1.0,
        direction: -1,
        shadow: true,
        hwaccel: true
    };

});