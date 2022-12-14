---
title: ".NET 自定义自动依赖注入特性工具"
index_img: https://picgo.ddvlhr.red/picgo/202211260135118.jpeg
banner_img: https://picgo.ddvlhr.red/picgo/202211260135118.jpeg
date: 2022/11/26
tags: [.NET, DI, C#]
categories: [Backend]
---
> 该 Attribute 为自定义自动依赖注入工具, 只需要在 class 中使用该 Attribute 即可以自动注入, 不必在 Program.cs 或者 Startup.cs 中手动注入. 

<!-- more -->

## 1.创建 InjectType 枚举类

该枚举类定义三种生命周期, 分别为 Singleton, Scoped, Transient.

``` c#
/// <summary>
/// 注入类型
/// </summary>
public enum InjectType
{
    Scope,
    Single,
    Transient
}
```
## 2.创建 AutoInjectAttribute.cs 文件
``` c#
[AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
public class AutoInjectAttribute: Attribute
{
    public AutoInjectAttribute(Type interfaceType, InjectType injectType)
    {
        Type = interfaceType;
        InjectType = injectType;
    }

    public Type Type { get; set; }
    public InjectType InjectType { get; set; }
}
```
## 3.创建 AutoInjectExtension.cs 文件

该文件为自动注入扩展方法类.

``` c#
public static class AutoInjectExtension {
    /// <summary>
    /// 自动注入所有的程序集有InjectAttribute标签
    /// </summary>
    /// <param name="serviceCollection"></param>
    /// <returns></returns>
    public static IServiceCollection AddAutoDi(this IServiceCollection serviceCollection)
    {
        var path = AppDomain.CurrentDomain.BaseDirectory;
        var assemblies = Directory.GetFiles(path, "*.dll").Select(Assembly.LoadFrom).ToList();
        foreach (var assembly in assemblies)
        {
            var types = assembly.GetTypes().Where(a => a.GetCustomAttribute<AutoInjectAttribute>() != null)
                .ToList();
            if (types.Count <= 0) continue;
            foreach (var type in types)
            {
                var attr = type.GetCustomAttribute<AutoInjectAttribute>();
                if (attr?.Type == null) continue;
                switch (attr.InjectType)
                {
                    case InjectType.Scope:
                        serviceCollection.AddScoped(attr.Type, type);
                        break;
                    case InjectType.Single:
                        serviceCollection.AddSingleton(attr.Type, type);
                        break;
                    case InjectType.Transient:
                        serviceCollection.AddTransient(attr.Type, type);
                        break;
                    default:
                        throw new ArgumentOutOfRangeException();
                }
            }
        }
        return serviceCollection;
    }
}
```
## 4.注册扩展方法

在 Program.cs 或者 Startup.cs 中注册该扩展方法.

``` c#
services.AddAutoDi();
```
## 5.使用

在需要注入的类中使用该 Attribute.

``` c#
[AutoInject(typeof(IUserService), InjectType.Scope)]
public class UserService: IUserService {}
```