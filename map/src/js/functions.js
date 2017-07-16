$(document).ready(function() {
    
    $('#machinevision').on('hidden.bs.modal', function() {

	// This is a quick and easy way of stopping the video once the modal is hidden.
	// Still looking for a way to pause it without using the youtube-API.
	
	//$this.postMessage('{"event":"command","func":"pauseVideo","args":""}','*');
	//iframe.postMessage('{"event":"command","func":"' + func + '","args":""}','*');

	var $this = $(this).find('iframe'), tempSrc = $this.attr('src');
	$this.attr('src', "");
	$this.attr('src', tempSrc);
    });
    
    $('#androidapp').on('hidden.bs.modal', function() {
	var $this = $(this).find('iframe'), tempSrc = $this.attr('src');
	$this.attr('src', "");
	$this.attr('src', tempSrc);
    });

    $('#embeddedlinux').on('hidden.bs.modal', function() {
	var $this = $(this).find('iframe'), tempSrc = $this.attr('src');
	$this.attr('src', "");
	$this.attr('src', tempSrc);
    });
    
    $('#websites').on('hidden.bs.modal', function() {
	var $this = $(this).find('iframe'), tempSrc = $this.attr('src');
	$this.attr('src', "");
	$this.attr('src', tempSrc);
    });

});
