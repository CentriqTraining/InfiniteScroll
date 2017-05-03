using InfiniteScroll.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Caching;
using System.Web.Http;

namespace InfiniteScroll.Controllers
{
    public class JsonDataController : ApiController
    {
        private List<ToonData> _Toons;
        public const int pageSize = 10;
        public JsonDataController()
        {
            var Cache = MemoryCache.Default;

            if (Cache["Toons"] != null)
            {
                _Toons = Cache["Toons"] as List<ToonData>;
            }
            else
            {
                using (var _DB = new TrainingDAtaEntities())
                {
                    _Toons = _DB.ToonDatas.ToList();
                }
            }
        }
        public IEnumerable<ToonData> Get(int id)
        {
            var items = _Toons.
                Skip((id - 1) * pageSize).
                Take(pageSize);
            return items;
        }
    }
}
