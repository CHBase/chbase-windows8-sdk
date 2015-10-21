// (c) Microsoft. All rights reserved

using CHBase.Foundation;
using System.Xml.Serialization;

namespace CHBase.Types
{
    [XmlType("thing-type-id")]
    public sealed class QueryPermissionsRequestParams : IHealthVaultType
    {
        public QueryPermissionsRequestParams()
        { 
        }

        public QueryPermissionsRequestParams(string thingTypeId)
        {
            thingTypeId.ValidateRequired("thingTypeId");

            this.ThingTypeId = thingTypeId;
        }

        [XmlText]
        public string ThingTypeId
        {
            get; set;
        }

        public void Validate()
        {
            ThingTypeId.ValidateRequired("ThingTypeId");
        }
    }
}