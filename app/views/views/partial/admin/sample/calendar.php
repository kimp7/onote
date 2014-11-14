<div class="span9" id="content">
    <div class="row-fluid">
        <!-- block -->
        <div class="block">
            <div class="navbar navbar-inner block-header">
                <div class="muted pull-left">Calendar</div>
                <div class="pull-right"><span class="badge badge-warning">View More</span>

                </div>
            </div>
            <div class="block-content collapse in">
                <div class="span12">
                    <div id='calendar'></div>
                </div>
            </div>
        </div>
        <!-- /block -->
    </div>
</div>
<script src="vendors/fullcalendar/fullcalendar.js"></script>
<script src="vendors/fullcalendar/gcal.js"></script>
<script>
$(function() {
    // Easy pie charts
    $('#calendar').fullCalendar({
	header: {
		left: 'prev,next',
		center: 'title',
		right: 'month,basicWeek,basicDay'
	},
	editable: true,
	// US Holidays
	events: 'http://www.google.com/calendar/feeds/usa__en%40holiday.calendar.google.com/public/basic'
	
	});
});
</script>
