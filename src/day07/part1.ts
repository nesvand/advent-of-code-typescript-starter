// Advent of Code - Day 7 - Part One

interface BaseFile extends Record<string, unknown> {
  name: string;
}

export interface File extends BaseFile {
  type: 'file';
  size: number;
}

export interface Directory extends BaseFile {
  type: 'dir';
  files: Array<File | Directory>;
  '..'?: Directory;
  size: number;
}

export function isDirectory(file: any): file is Directory {
  return file?.type === 'dir';
}

export function parseInput(input: string): Directory {
  const filesystem: Directory = { type: 'dir', name: '/', files: [], size: 0 };
  let cwd = filesystem;
  input
    .split('\n')
    .filter(Boolean)
    .forEach(command => {
      if (command.trim().startsWith('$')) {
        const [, op, ...args] = command.trim().split(' ');
        switch (op) {
          case 'cd': {
            switch (args[0]) {
              case '/': {
                cwd = filesystem;
                break;
              }
              case '..': {
                cwd = cwd['..'] ? cwd['..'] : cwd;
                break;
              }
              default: {
                let dir = cwd.files.filter(isDirectory).find(d => d.name === args[0]);
                if (!dir) {
                  dir = { name: args[0], type: 'dir', '..': cwd, files: [], size: 0 };
                  cwd.files.push(dir);
                }
                cwd = dir;
              }
            }
            break;
          }
          case 'ls': {
            // noop - wait for next $ op
            break;
          }
          default: {
            throw new Error(`Unknown command: ${op}`);
          }
        }

        return;
      }

      const [dirOrFileSize, dirOrFileName] = command.trim().split(' ');
      switch (dirOrFileSize) {
        case 'dir': {
          cwd.files.push({ type: 'dir', name: dirOrFileName, files: [], '..': cwd, size: 0 });
          break;
        }
        default: {
          const fileSize = parseInt(dirOrFileSize, 10);
          cwd.files.push({ type: 'file', name: dirOrFileName, size: fileSize });
        }
      }
    });

  return filesystem;
}

export function calculateDirectorySize(cwd: Directory): number {
  for (const f of cwd.files) {
    if (isDirectory(f)) {
      cwd.size += calculateDirectorySize(f);
      continue;
    }
    cwd.size += f.size;
  }

  return cwd.size;
}

export function part1(input: string): number {
  const filesystem = parseInput(input);
  calculateDirectorySize(filesystem);
  const directorySizesBelow100_000: number[] = [];
  function dive(dir: Directory) {
    dir.files.filter(isDirectory).forEach(dive);
    if (dir.size < 100_000) {
      directorySizesBelow100_000.push(dir.size);
    }
  }
  dive(filesystem);

  return directorySizesBelow100_000.reduce((a, b) => a + b, 0);
}
