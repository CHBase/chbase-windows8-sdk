// (c) Microsoft. All rights reserved
using System;

namespace CHBase.Foundation
{
    public class ResponseDeserializationContext
    {
        public Type BodyType { get; set; }

        public string ItemTypeId { get; set; }
    }
}