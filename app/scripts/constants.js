'use strict';

angular.module('xke')
    .constant('types', ['Contest', 'Demo', 'Debate', 'Dojo', 'Formal', 'Hackathon', 'Hands-on', 'Other', 'Quickie', 'Training'])
    .constant('durations', [15, 30, 45, 60, 90, 120, 150, 180, 210, 240])
    .constant('fondations', ['Craft', 'Mobile', 'Agile', 'Front', 'Back', 'Data', 'Cloud', 'DevOps', 'Divers']);
