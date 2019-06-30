#!/usr/bin/env node
'use strict';
const app = require('commander');
const cfg = require('../../package.json');
const bundleScss = require('../index');
app
    .version(cfg.version)
    .option('-d, --dest <dest>', 'destination of bundled file')
    .option('-m, --mask <mask>', 'mask for files like ./src/**/*.theme.scss')
    .option('-s, --sort <sort>', `Optional. Sort priority for files.
    Example: 'variable' - will pass all variables at beginning.
    Default priority ['theme-variable', 'variable', 'mixin']`)
    .option('-c, --config', 'true or false, try to get params from package.json or bundle-style.json')
    .parse(process.argv);
if ((app.mask && app.dest) || app.config) {
    bundleScss(app.mask, app.dest, app.sort, app.config);
}
else {
    throw new Error('Please check options: -m, -d. \nLooks like some of them are not specified');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLXNjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2J1bmRsZS1zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxZQUFZLENBQUM7QUFFYixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXZDLEdBQUc7S0FDQSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztLQUNwQixNQUFNLENBQUMsbUJBQW1CLEVBQUUsNkJBQTZCLENBQUM7S0FDMUQsTUFBTSxDQUFDLG1CQUFtQixFQUFFLDJDQUEyQyxDQUFDO0tBQ3hFLE1BQU0sQ0FDTCxtQkFBbUIsRUFDbkI7OzZEQUV5RCxDQUMxRDtLQUNBLE1BQU0sQ0FDTCxjQUFjLEVBQ2QseUVBQXlFLENBQzFFO0tBQ0EsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV2QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtJQUN4QyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQ3REO0tBQU07SUFDTCxNQUFNLElBQUksS0FBSyxDQUNiLDJFQUEyRSxDQUM1RSxDQUFDO0NBQ0giLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgYXBwID0gcmVxdWlyZSgnY29tbWFuZGVyJyk7XG5jb25zdCBjZmcgPSByZXF1aXJlKCcuLi8uLi9wYWNrYWdlLmpzb24nKTtcbmNvbnN0IGJ1bmRsZVNjc3MgPSByZXF1aXJlKCcuLi9pbmRleCcpO1xuXG5hcHBcbiAgLnZlcnNpb24oY2ZnLnZlcnNpb24pXG4gIC5vcHRpb24oJy1kLCAtLWRlc3QgPGRlc3Q+JywgJ2Rlc3RpbmF0aW9uIG9mIGJ1bmRsZWQgZmlsZScpXG4gIC5vcHRpb24oJy1tLCAtLW1hc2sgPG1hc2s+JywgJ21hc2sgZm9yIGZpbGVzIGxpa2UgLi9zcmMvKiovKi50aGVtZS5zY3NzJylcbiAgLm9wdGlvbihcbiAgICAnLXMsIC0tc29ydCA8c29ydD4nLFxuICAgIGBPcHRpb25hbC4gU29ydCBwcmlvcml0eSBmb3IgZmlsZXMuXG4gICAgRXhhbXBsZTogJ3ZhcmlhYmxlJyAtIHdpbGwgcGFzcyBhbGwgdmFyaWFibGVzIGF0IGJlZ2lubmluZy5cbiAgICBEZWZhdWx0IHByaW9yaXR5IFsndGhlbWUtdmFyaWFibGUnLCAndmFyaWFibGUnLCAnbWl4aW4nXWBcbiAgKVxuICAub3B0aW9uKFxuICAgICctYywgLS1jb25maWcnLFxuICAgICd0cnVlIG9yIGZhbHNlLCB0cnkgdG8gZ2V0IHBhcmFtcyBmcm9tIHBhY2thZ2UuanNvbiBvciBidW5kbGUtc3R5bGUuanNvbidcbiAgKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuaWYgKChhcHAubWFzayAmJiBhcHAuZGVzdCkgfHwgYXBwLmNvbmZpZykge1xuICBidW5kbGVTY3NzKGFwcC5tYXNrLCBhcHAuZGVzdCwgYXBwLnNvcnQsIGFwcC5jb25maWcpO1xufSBlbHNlIHtcbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgICdQbGVhc2UgY2hlY2sgb3B0aW9uczogLW0sIC1kLiBcXG5Mb29rcyBsaWtlIHNvbWUgb2YgdGhlbSBhcmUgbm90IHNwZWNpZmllZCdcbiAgKTtcbn1cbiJdfQ==