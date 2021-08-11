---
title: "I am creating a programming language"
date: 2021-08-11T20:26:08-05:00
publishDate: 2021-08-11
summary: "I am embarking on a journey to build a new language."
---

I am embarking on a journey to build a new language.

This is a project that I have wanted to take on for a long time. As a developer,
it feels like a rite of passage. A way to prove my ability. An acknowledgement,
finally, that I _am_ a developer, never to be a mathematician.

It is going to be hard.

I do not know much of anything about implementing a language, let alone
designing one. My expertise lies in the front end: JavaScript, HTML, CSS. My
understanding of strongly-typed languages comes from TypeScript. Sure, I have
_used_ several other languages before. But to say that I am fluent or productive
in any of those is probably untrue.

I did not go to school for software engineering. I went to school for
mathematics. I have never seen a compiler. I don't know much about managing
memory. I have never written assembly code. The very contents of this paragraph
probably betray my ignorance of topic.

My skills lie in learning and understanding complex topics quickly. I am hoping
that is enough to make me ready for this project.

## Why would I bother with this?

It's a sensible question. Before taking on a large project, one should be clear
about their motivations.

### I have ideas that I want to express

In my few years as a software developer, I have seen different choices made for
different languages. Like any developer, I have formed opinions on what I think
are good and bad ideas. Actually, it is more accurate to say that I've formed
opinions about the contexts in which ideas are good or bad, but that distinction
requires another blog post to discuss.

One such opinion, and the foundational opinion that led me to take on this
project, is this: I believe that we have solved all of the _programming_
problems that can be solved by a language alone. For any computing task you
have, there is a language that is readily available and reasonably supported
that is well-suited to solving that task.

The room for improvement exists one layer out. Instead of solving _programming_
problems, we need to get better at solving _development_ problems. There are
many well-understood problems that can still be a huge hassle and time-suck for
developers:

- Writing tests
- Managing dependencies
- Deployments
- Linting and formatting
- Meta-programming
- Code generation
- Documentation

Up to now, most of these problems tend to live outside of the language and left
to users to solve. Some languages provide built-in or canonical tools for some
of these problems, with varying degrees of success and adoption. Others have
community-maintained tools, which can be good but are often hamstrung by the
lack of native language support for them.

I want to develop and share a vision for how developer tools can be more deeply
integrated into the language itself, and how such a system can feel like a
superpower to developers. I believe that getting this right is a much bigger
success factor for a language than the features of the language in isolation.

(If it is possible, I would love to develop such a system that can be
incorporated into any programming language. At this time, I am not convinced
this is possible. One avenue I would like to explore is something like the
[Language Server Protocol][lsp], or perhaps expanding on it directly.)

[lsp]:
  https://github.com/microsoft/language-server-protocol
  "Language Server Protocol"

### I enjoy learning

Learning new things is fun! Learning a hard thing is more fun because you learn
more new things faster.

Creating a programming is hard work, I am told. I am ready to "embrace the suck"
and figure it out.

### I enjoy sharing

When I find cool things, I enjoy sharing them with others. When I learn cool
things, I _really_ enjoy sharing them with others. I am going to be learning a
lot, and I am going to be documenting the process here on my website.

## What's next?

So far, I have written this blog post and a bunch of notes of ideas I have about
the language. I am going to keep pondering these ideas, and some of them might
turn into future blog posts.

Otherwise, I am going to more-or-less follow the path recommended by [Drew
DeVault][dd]:

1. Write a lot of pseudo-code and write down my ideas. For me, this process will
   include that developer infrastructure around the language, and how the
   language itself might interact with those tools.
2. Iterate on some throwaway compilers. The purpose of these are to validate the
   language ideas and see how they feel to use. I have to be able to change the
   grammar quickly. I plan to read [Beautiful Racket][br] and use the [Racket
   language][racket] to implement this.
3. Write a formal specification. The simplicity and approachability of the [Go
   language spec][spec] is, I think, a good example to draw from.
4. Write a second compiler. DeVault encourages writing this in C, but I have
   zero experience in C. I have a little experience in Go, which is infinitely
   more than C, so I will use that. I will probably get the book [_Writing A
   Compiler In Go_][compiler] and use that as my guide. At the same time, the
   specification will probably be changing.

[dd]:
  https://drewdevault.com/2020/12/25/How-to-design-a-new-programming-language.html
  "How to design a new programming language"
[br]: https://beautifulracket.com/ "Beautiful Racket"
[racket]: https://racket-lang.org/ "Racket, the Programming Language"
[spec]: https://golang.org/ref/spec "The Go Programming Language Specification"
[compiler]: https://compilerbook.com/ "Writing A Compiler In Go"

If I get to this point, the final step would be to implement a compiler in the
new language. That will be a momentous occasion!
