$(function () {
  $.ajax({
    url: 'https://www.codeschool.com/users/CHaNGeTe.json',
    dataType: 'jsonp',
    success: function (response) {
      // handle response
      const $badges = $("#badges");
      // completed courses
      if (response.courses.completed.length) {
        $badges.append("<h2>Completed</h2>");
        response.courses.completed.sort((courseA, courseB) => {
          return courseA.title < courseB.title ? -1 : 1;
        }).map((course) => {
          $badges.append(`<div class='course' title="${course.title}" alt="${course.title}">
            <h3>${course.title}</h3>
            <img src="${course.badge}" />
            <a target="_blank" href="${course.url}" class="btn btn-primary" title="${course.title}" alt="${course.title}">See Course</a>
          </div>`);
        });
      }
      // completed courses
      if (response.courses.in_progress.length) {
        $badges.append("<h2>In progress</h2>");
        response.courses.in_progress.sort((courseA, courseB) => {
          return courseA.title < courseB.title ? -1 : 1;
        }).map((course) => {
          $badges.append(`<div class='course' title="${course.title}" alt="${course.title}">
            <h3>${course.title}</h3>
            <img src="${course.badge}" title="${course.title}" alt="${course.title}"/>
            <a target="_blank" href="${course.url}" class="btn btn-primary">See Course</a>
          </div>`);
        });
      }
      // user badges
      if (response.badges.length) {
        $badges.append("<h2>User badges</h2>");
        $badges.append(`<div id='user-badges'></div>`);
        const $userBadges = $badges.find("#user-badges");
        response.badges.sort((badgeA, badgeB) => {
          return badgeA.name < badgeB.name ? -1 : 1;
        }).map((badge) => {
          $userBadges.append(`<div class='user-badge' title="${badge.name}" alt="${badge.name}">
            <img src="${badge.badge}" title="${badge.name}" alt="${badge.name}" />
            <p>${badge.name}</p>
          </div>`);
        });
      }
    }
  });
});
