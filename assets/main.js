$(function () {
  $.ajax({
    url: 'https://www.codeschool.com/users/jmGilFer.json',
    dataType: 'jsonp',
    success: function (response) {
      // handle response
      const $badges = $("#badges");
      // completed courses
      if (response.courses.completed.length) {
        const completedBadges = [];
        response.courses.completed.sort((courseA, courseB) => {
          return courseA.title < courseB.title ? -1 : 1;
        }).map((course) => {
          completedBadges.push(`<div class='course' title="${course.title}" alt="${course.title}">
            <h3>${course.title}</h3>
            <img src="${course.badge}" />
            <a target="_blank" href="${course.url}" class="btn btn-primary" title="${course.title}" alt="${course.title}">See Course</a>
          </div>`);
        });
        $badges.append(`<h2>Completed</h2>${completedBadges.join('')}`);
      }
      // completed courses
      if (response.courses.in_progress.length) {
        const inProgressBadges = [];
        response.courses.in_progress.sort((courseA, courseB) => {
          return courseA.title < courseB.title ? -1 : 1;
        }).map((course) => {
          inProgressBadges.push(`<div class='course' title="${course.title}" alt="${course.title}">
            <h3>${course.title}</h3>
            <img src="${course.badge}" title="${course.title}" alt="${course.title}"/>
            <a target="_blank" href="${course.url}" class="btn btn-primary">See Course</a>
          </div>`);
        });
        $badges.append(`<h2>In progress</h2>${inProgressBadges.join('')}`);
      }
      if (response.badges.length) {
        const progress = response.badges.filter((badge) => {
          return badge.course_url != null && badge.course_url != "";
        });
        const userbadges = response.badges.filter((badge) => {
          return badge.course_url == null || badge.course_url == "";
        });
        //progress
        if (progress.length) {
          $badges.append("<h2>Progress</h2><div id='progress-badges'></div>");
          const $progressBadges = $badges.find("#progress-badges");
          const badgeGroup = [];
          const progressBadges = [];
          progress.sort((badgeA, badgeB) => {
            return badgeA.course_url < badgeB.course_url ? -1 : 1;
          }).map((badge) => {
            if (!badgeGroup[badge.course_url]) {
              badgeGroup[badge.course_url] = randomHSL();
            }
            let groupColor = badgeGroup[badge.course_url];
            const $newEl = $(`${badge.course_url ? `<a class="linked-badge" href=${badge.course_url}>` : ""}
            <div style="background:${groupColor.bg}; border: 1px solid ${groupColor.border}" class='user-badge ${badge.course_url ? `badge-group` : ""}' title="${badge.name}" alt="${badge.name}">
              <img src="${badge.badge}" title="${badge.name}" alt="${badge.name}" />
              <p>${badge.name}</p>
            </div>
            ${badge.course_url ? `</a>` : ""}`);
            progressBadges.push($newEl);
          });
          $progressBadges.append(progressBadges);
          
        }
        // user badges
        if (userbadges.length) {
          $badges.append("<h2>User badges</h2><div id='user-badges'></div>");
          const $userBadges = $badges.find("#user-badges");
          const badgeGroup = [];
          const userBadges = [];
          userbadges.sort((badgeA, badgeB) => {
            return badgeA.course_url < badgeB.course_url ? -1 : 1;
          }).map((badge) => {
            if (!badgeGroup[badge.course_url]) {
              badgeGroup[badge.course_url] = randomHSL();
            }
            let groupColor = badgeGroup[badge.course_url];
            const $newEl = $(`${badge.course_url ? `<a class="linked-badge" href=${badge.course_url}>` : ""}
            <div style="background:${groupColor.bg}; border: 1px solid ${groupColor.border}" class='user-badge ${badge.course_url ? `badge-group` : ""}' title="${badge.name}" alt="${badge.name}">
              <img src="${badge.badge}" title="${badge.name}" alt="${badge.name}" />
              <p>${badge.name}</p>
            </div>
            ${badge.course_url ? `</a>` : ""}`);
            userBadges.push($newEl);
          });
          $userBadges.append(userBadges);
          
        }
      }
    }
  });

  function randomHSL() {
    const h = 360 * Math.random();
    const s = (25 + 70 * Math.random());
    const l = (85 + 10 * Math.random());
    return {
      bg: `hsl(${h}, ${s}%, ${l}%)`,
      border: `hsl(${h}, ${s}%, ${l - 10}%)`
    };
  }
});
