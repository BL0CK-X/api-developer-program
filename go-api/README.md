Developing the tutorial for the language `go` is of specific interest. This is because, per my understanding, <a href="https://stackoverflow.com/questions/12168873/cross-compile-go-on-osx">you can compile Go to a
Linux binary</a> on a non-Linux device.

This is great for two reasons:
1) Currently, run the binaries on a Linux server. Thus, native Linux binaries will be faster than Windows/Mac binaries run on a Linux machine.
2) This means we use packages that help us run non-native binaries (Windows, Linux), and these packages sometimes have bugs. Thus, compiling for Linux will result in a less buggy and more predictable deployment experience.

Pull requests are welcome!