#!/usr/bin/env node
'use strict';
const program = require('commander');
const cfg = require('../../package.json');
const bundleScss = require('../index');
program
    .version(cfg.version)
    .option('-d, --dest <dest>', 'destination of bundled file')
    .option('-m, --mask <mask>', 'mask for files like ./src/**/*.theme.scss')
    .option('-s, --sort <sort>', `Optional. Sort priority for files.
    Example: 'variable' - will pass all variables at beginning.
    Default priority ['theme-variable', 'variable', 'mixin']`)
    .option('-c, --config', 'true or false, try to get params from package.json or bundle-style.json')
    .parse(process.argv);
const app = program.opts();
if (typeof app === 'object') {
    for (const key in app) {
        if (Object.prototype.hasOwnProperty.call(app, key)) {
            const element = app[key];
            console.log(`${key} ${element}`);
        }
    }
}
if ((app.mask && app.dest) || app.config) {
    bundleScss(app.mask, app.dest, app.sort, app.config);
}
else {
    throw new Error('Please check options: -m, -d. \nLooks like some of them are not specified');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLXNjc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmluL2J1bmRsZS1zY3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQSxZQUFZLENBQUM7QUFFYixNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckMsTUFBTSxHQUFHLEdBQUcsT0FBTyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDMUMsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBRXZDLE9BQU87S0FDSixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztLQUNwQixNQUFNLENBQUMsbUJBQW1CLEVBQUUsNkJBQTZCLENBQUM7S0FDMUQsTUFBTSxDQUFDLG1CQUFtQixFQUFFLDJDQUEyQyxDQUFDO0tBQ3hFLE1BQU0sQ0FDTCxtQkFBbUIsRUFDbkI7OzZEQUV5RCxDQUMxRDtLQUNBLE1BQU0sQ0FDTCxjQUFjLEVBQ2QseUVBQXlFLENBQzFFO0tBQ0EsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUV2QixNQUFNLEdBQUcsR0FBRyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7QUFFM0IsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7SUFDM0IsS0FBSyxNQUFNLEdBQUcsSUFBSSxHQUFHLEVBQUU7UUFDckIsSUFBSSxNQUFNLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO1lBQ2xELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDbEM7S0FDRjtDQUNGO0FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7SUFDeEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUN0RDtLQUFNO0lBQ0wsTUFBTSxJQUFJLEtBQUssQ0FDYiwyRUFBMkUsQ0FDNUUsQ0FBQztDQUNIIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHByb2dyYW0gPSByZXF1aXJlKCdjb21tYW5kZXInKTtcbmNvbnN0IGNmZyA9IHJlcXVpcmUoJy4uLy4uL3BhY2thZ2UuanNvbicpO1xuY29uc3QgYnVuZGxlU2NzcyA9IHJlcXVpcmUoJy4uL2luZGV4Jyk7XG5cbnByb2dyYW1cbiAgLnZlcnNpb24oY2ZnLnZlcnNpb24pXG4gIC5vcHRpb24oJy1kLCAtLWRlc3QgPGRlc3Q+JywgJ2Rlc3RpbmF0aW9uIG9mIGJ1bmRsZWQgZmlsZScpXG4gIC5vcHRpb24oJy1tLCAtLW1hc2sgPG1hc2s+JywgJ21hc2sgZm9yIGZpbGVzIGxpa2UgLi9zcmMvKiovKi50aGVtZS5zY3NzJylcbiAgLm9wdGlvbihcbiAgICAnLXMsIC0tc29ydCA8c29ydD4nLFxuICAgIGBPcHRpb25hbC4gU29ydCBwcmlvcml0eSBmb3IgZmlsZXMuXG4gICAgRXhhbXBsZTogJ3ZhcmlhYmxlJyAtIHdpbGwgcGFzcyBhbGwgdmFyaWFibGVzIGF0IGJlZ2lubmluZy5cbiAgICBEZWZhdWx0IHByaW9yaXR5IFsndGhlbWUtdmFyaWFibGUnLCAndmFyaWFibGUnLCAnbWl4aW4nXWBcbiAgKVxuICAub3B0aW9uKFxuICAgICctYywgLS1jb25maWcnLFxuICAgICd0cnVlIG9yIGZhbHNlLCB0cnkgdG8gZ2V0IHBhcmFtcyBmcm9tIHBhY2thZ2UuanNvbiBvciBidW5kbGUtc3R5bGUuanNvbidcbiAgKVxuICAucGFyc2UocHJvY2Vzcy5hcmd2KTtcblxuY29uc3QgYXBwID0gcHJvZ3JhbS5vcHRzKCk7XG5cbmlmICh0eXBlb2YgYXBwID09PSAnb2JqZWN0Jykge1xuICBmb3IgKGNvbnN0IGtleSBpbiBhcHApIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGFwcCwga2V5KSkge1xuICAgICAgY29uc3QgZWxlbWVudCA9IGFwcFtrZXldO1xuICAgICAgY29uc29sZS5sb2coYCR7a2V5fSAke2VsZW1lbnR9YCk7XG4gICAgfVxuICB9XG59XG5pZiAoKGFwcC5tYXNrICYmIGFwcC5kZXN0KSB8fCBhcHAuY29uZmlnKSB7XG4gIGJ1bmRsZVNjc3MoYXBwLm1hc2ssIGFwcC5kZXN0LCBhcHAuc29ydCwgYXBwLmNvbmZpZyk7XG59IGVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ1BsZWFzZSBjaGVjayBvcHRpb25zOiAtbSwgLWQuIFxcbkxvb2tzIGxpa2Ugc29tZSBvZiB0aGVtIGFyZSBub3Qgc3BlY2lmaWVkJ1xuICApO1xufVxuIl19