// Datos de usuarios con programación predefinida
const userProgram = {
    'user1': {
        password: 'password1',
        content: {
            'Week 1': [
                'Day 1: 5 rounds of 400m run, 15 pull-ups, 20 push-ups, 25 squats.',
                'Day 2: 10 rounds of 10 deadlifts, 10 box jumps.',
                'Day 3: 4 rounds of 800m run, 30 sit-ups, 40 lunges.',
                'Day 4: Rest day.',
                'Day 5: 5 rounds of 20 wall balls, 15 kettlebell swings, 10 burpees.',
                'Day 6: 3 rounds of 500m row, 15 thrusters, 15 toes-to-bar.',
                'Day 7: 1 hour mobility work and stretching.'
            ],
            'Week 2': [
                'Day 1: 4 rounds of 500m row, 20 push-ups, 25 sit-ups.',
                'Day 2: 5 rounds of 10 power cleans, 10 pull-ups.',
                'Day 3: 10 rounds of 100m sprint, 10 box jumps.',
                'Day 4: Rest day.',
                'Day 5: 4 rounds of 400m run, 30 squats, 20 kettlebell swings.',
                'Day 6: 5 rounds of 15 deadlifts, 10 push-ups, 5 muscle-ups.',
                'Day 7: 30 minutes light jog, 30 minutes stretching.'
            ],
            'Week 3': [
                'Day 1: 6 rounds of 400m run, 10 thrusters, 15 pull-ups.',
                'Day 2: 4 rounds of 25 burpees, 50 double-unders.',
                'Day 3: 5 rounds of 10 front squats, 20 sit-ups, 30 lunges.',
                'Day 4: Rest day.',
                'Day 5: 4 rounds of 800m run, 15 power cleans, 20 box jumps.',
                'Day 6: 3 rounds of 500m row, 20 deadlifts, 10 overhead presses.',
                'Day 7: 1 hour yoga or stretching.'
            ],
            'Week 4': [
                'Day 1: 5 rounds of 20 kettlebell swings, 10 burpees, 400m run.',
                'Day 2: 4 rounds of 15 snatches, 20 wall balls.',
                'Day 3: 10 rounds of 100m sprint, 10 push-ups, 10 sit-ups.',
                'Day 4: Rest day.',
                'Day 5: 3 rounds of 800m run, 30 sit-ups, 15 thrusters.',
                'Day 6: 5 rounds of 20 pull-ups, 30 box jumps, 15 deadlifts.',
                'Day 7: 1 hour recovery work and mobility.'
            ]
        }
    },
    'user2': {
        password: 'password2',
        content: {
            'Week 1': [
                'Day 1: 5 rounds of 300m run, 20 push-ups, 30 sit-ups.',
                'Day 2: 8 rounds of 8 deadlifts, 12 box jumps.',
                'Day 3: 3 rounds of 600m run, 40 sit-ups, 50 lunges.',
                'Day 4: Rest day.',
                'Day 5: 4 rounds of 15 wall balls, 10 kettlebell swings, 15 burpees.',
                'Day 6: 4 rounds of 400m row, 10 thrusters, 20 toes-to-bar.',
                'Day 7: 45 minutes mobility work and stretching.'
            ],
            'Week 2': [
                'Day 1: 3 rounds of 600m row, 15 push-ups, 20 sit-ups.',
                'Day 2: 6 rounds of 12 power cleans, 15 pull-ups.',
                'Day 3: 8 rounds of 80m sprint, 15 box jumps.',
                'Day 4: Rest day.',
                'Day 5: 5 rounds of 500m run, 25 squats, 10 kettlebell swings.',
                'Day 6: 4 rounds of 20 deadlifts, 15 push-ups, 10 muscle-ups.',
                'Day 7: 30 minutes light jog, 30 minutes stretching.'
            ],
            'Week 3': [
                'Day 1: 7 rounds of 300m run, 12 thrusters, 20 pull-ups.',
                'Day 2: 5 rounds of 20 burpees, 40 double-unders.',
                'Day 3: 4 rounds of 12 front squats, 30 sit-ups, 20 lunges.',
                'Day 4: Rest day.',
                'Day 5: 3 rounds of 600m run, 20 power cleans, 25 box jumps.',
                'Day 6: 4 rounds of 400m row, 15 deadlifts, 12 overhead presses.',
                'Day 7: 1 hour yoga or stretching.'
            ],
            'Week 4': [
                'Day 1: 4 rounds of 25 kettlebell swings, 15 burpees, 500m run.',
                'Day 2: 5 rounds of 20 snatches, 15 wall balls.',
                'Day 3: 8 rounds of 80m sprint, 15 push-ups, 15 sit-ups.',
                'Day 4: Rest day.',
                'Day 5: 4 rounds of 600m run, 35 sit-ups, 20 thrusters.',
                'Day 6: 4 rounds of 25 pull-ups, 30 box jumps, 20 deadlifts.',
                'Day 7: 1 hour recovery work and mobility.'
            ]
        }
    }
};

// Check if user is already logged in
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem('loggedInUser')) {
        showContent();
    }
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (userProgram[username] && userProgram[username].password === password) {
        localStorage.setItem('loggedInUser', username);
        showContent();
    } else {
        document.getElementById('error-message').textContent = 'Invalid username or password.';
        document.getElementById('error-message').style.color = '#ff3333';
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    location.reload();
}

function showContent() {
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('content-container').classList.remove('hidden');

    const username = localStorage.getItem('loggedInUser');
    const userContent = userProgram[username].content;

    const weekContainer = document.getElementById('week-container');
    Object.keys(userContent).forEach((week, index) => {
        const weekDiv = document.createElement('div');
        weekDiv.className = 'week';
        weekDiv.textContent = week;
        weekDiv.onclick = () => toggleDays(weekDiv, week, userContent);
        weekContainer.appendChild(weekDiv);
    });
}

function toggleDays(weekDiv, weekName, userContent) {
    let daysContainer = weekDiv.querySelector('.days-container');
    if (!daysContainer) {
        daysContainer = document.createElement('div');
        daysContainer.className = 'days-container';
        weekDiv.appendChild(daysContainer);
        
        userContent[weekName].forEach((dayContent, i) => {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'day';
            dayDiv.textContent = `Day ${i + 1}`;
            dayDiv.onclick = () => showExerciseDetails(weekName, i);
            daysContainer.appendChild(dayDiv);
        });
    }
    daysContainer.classList.toggle('hidden');
}

function showExerciseDetails(weekName, dayIndex) {
    const username = localStorage.getItem('loggedInUser');
    const descriptionContainer = document.getElementById('exercise-description');
    const content = userProgram[username].content[weekName][dayIndex];
    descriptionContainer.innerHTML = `<h3>${weekName} - Day ${dayIndex + 1}</h3><p>${content}</p>`;
    descriptionContainer.classList.remove('hidden');
}
