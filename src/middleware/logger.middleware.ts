import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '../modules/app/cache.service';
import { VisitsService } from '../modules/visits/visits.service';
import { lookup } from 'geoip-lite';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(
    private readonly cacheService: CacheService,
    private readonly visitsService: VisitsService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...method=' + req.method + '...url=' + req.baseUrl);

    const host: any = req.headers['x-forwarded-for'];
    // console.log(await this.cacheService.get(host));

    const visits = await this.cacheService.get(host);
    if (visits === null) {
      await this.cacheService.set(host, true, 600);
      let city: any = 'China';
      if (lookup(host) != null) {
        city = lookup(host);
      }
      const params = {
        host: host,
        city: city,
        userAgent: req.headers['user-agent'],
        entrance: req.headers['authorization'] ? '后台管理端' : ' 博客端',
        terminal: terminal(req.headers['user-agent']),
        explorer: myexplorer(req.headers['user-agent']),
      };
      this.visitsService.saveVisits(params);
    }
    next();
  }
}

function terminal(userAgent) {
  const u = userAgent;
  // app = navigator.appVersion;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    // android终端或者uc浏览器
    return 'android';
  } else if (u.indexOf('iPhone') > -1) {
    return 'iPhone';
  } else if (u.indexOf('Windows NT') > -1) {
    return 'windows';
  } else if (u.indexOf('Mac') > -1) {
    return 'mac';
  }
}

function myexplorer(explorer) {
  // if (explorer.indexOf('MSIE') >= 0) {
  //   return 'ie';
  // }
  //firefox
  if (explorer.indexOf('Firefox') >= 0) {
    return 'Firefox';
  }
  //Chrome
  else if (explorer.indexOf('Chrome') >= 0) {
    return 'Chrome';
  }
  //Opera
  else if (explorer.indexOf('Opera') >= 0) {
    return 'Opera';
  }
  //Safari
  else if (explorer.indexOf('Safari') >= 0) {
    return 'Safari';
  }
  //Netscape
  else if (explorer.indexOf('Netscape') >= 0) {
    return 'Netscape';
  } else {
    return 'IE';
  }
}

export function logger(req, res, next) {
  console.log(`Request...`);
  next();
}
