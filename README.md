## loading.tsx conflicting with nested layout
跟着视频的学习过程中，出现了一个 bug，在嵌套的路由层级中，子路由在加载中时，先显示父级路由的 loading.tsx，然后显示该子路由的 loading.tsx。最后当子路由内容加载完成，显示其内容。课程中没有解决，采用了拍平路由层级的丑陋的方式。这里通过查阅资料通过 Route Groups 解决。

参考资料：
- https://github.com/vercel/next.js/discussions/53383
- https://github.com/vercel/next.js/issues/43209
- https://stackoverflow.com/questions/77331825/nextjs-13-5-4-parent-loading-page-is-overwriting-child-loading-page
- https://nextjs.org/docs/app/building-your-application/routing/route-groups
