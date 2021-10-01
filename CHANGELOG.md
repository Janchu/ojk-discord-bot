# Changelog

## [Unreleased]

### Added

- LoR `card` command

### Changed

- Refactored changelog
- Every module now has a default command
- Allow same alias to be used in different modules

## [1.2.4] - 2021-03-14

### Changed

- Enabled beta environment

## [1.2.3] - 2021-01-13

### Changed

- Improved !help command

## [1.2.2] - 2020-11-05

### Added

- Testing step to github actions and run it on all pushes and pull requests

## [1.2.1] - 2020-10-09

### Changed

- Cleaned up environment variables
- Updated readme
- Updated dependencies

## [1.2.0] - 2020-05-06

### Added

- Aliases for commands

### Removed

- Hearthstone commands

### Changed

- Restructured commands

## [1.1.3] - 2020-04-17

### Changed

- Improved LoL champion info

## [1.1.2] - 2020-03-07

### Changed

- Upgraded to Discord.js v12

## [1.1.1] - 2020-02-26

### Added

- Automatic deployment
- Dotenv for managing environment variables

## [1.1.0] - 2019-12-08

### Changed

- `?` to `!` as command prefix.
- Some command spelling (see `!help`).
- Refactored code to more modular architecture.
- Created a command parser function to take care of all command parsing.

## [1.0.2] - 2019-02-23

### Added

- Added HS help.

### Fixed

- A bug in lol help.

## [1.0.1] - 2019-02-23

### Added

- `?version` (or `?v`) commands for getting OJK bot version
- `?changelog` command for getting the changelog.

### Changed

- Improved help response layout.

## [1.0.0] - 2019-02-17

### Added

- `?help` command to display help about all commands
- `?lol champion` command to search and display champion information
- `?lol random` command to suggest a random champion
- `?lol random-team` command to suggest a random team comp
- `?lol champions-total` command to get the total amount of champions
- `?lol api-version` command to display the current Data Dragon API used
- `?lol help` command to display help about LoL commands
- `?hs card` command to search and dispaly information about cards

[unreleased]: https://github.com/Janchu/ojk-discord-bot/compare/v1.2.3...HEAD
[1.2.4]: https://github.com/Janchu/ojk-discord-bot/compare/v1.2.3...v1.2.4
[1.2.3]: https://github.com/Janchu/ojk-discord-bot/compare/v1.2.2...v1.2.3
[1.2.2]: https://github.com/Janchu/ojk-discord-bot/compare/v1.2.1...v1.2.2
[1.2.1]: https://github.com/Janchu/ojk-discord-bot/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/Janchu/ojk-discord-bot/compare/v1.1.3...v1.2.0
[1.1.3]: https://github.com/Janchu/ojk-discord-bot/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/Janchu/ojk-discord-bot/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/Janchu/ojk-discord-bot/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/Janchu/ojk-discord-bot/compare/v1.0.2...v1.1.0
[1.0.2]: https://github.com/Janchu/ojk-discord-bot/compare/v1.0.1...v0.0.2
[1.0.1]: https://github.com/Janchu/ojk-discord-bot/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Janchu/ojk-discord-bot/releases/tag/v1.0.0
